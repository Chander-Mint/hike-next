import mongoose from 'mongoose';
import Event from '@/src/lib/models/eventModel';
import Ticket from '@/src/lib/models/ticketModel';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { handleFileUpload } from '@/src/lib/utils/awsUtils';
import categoryModel from '@/src/lib/models/categoryModel';
import slugify from 'slugify';
import { withDB } from '@/src/lib/utils/dbUtils';

export const dynamic = 'force-dynamic';

export const GET = withDB(async () => {
    try {

        const events = await Event.find().populate('tickets').lean();

        const eventsWithLatestTicketOnly = events.map(event => {

            const latestTicket = event.tickets
                .filter(ticket => new Date(ticket.startDate) > Date.now())
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

            return {
                _id: event._id,
                title: event.title,
                slug: event.slug,
                description: event.description,
                img: event.img,
                location: event.location,
                status: event.status,
                latestTicket: latestTicket ? {
                    price: latestTicket.price,
                    startDate: latestTicket.startDate,
                    status: latestTicket.status,
                } : null
            };
        });

        return sendSuccess({ events: eventsWithLatestTicketOnly, message: 'Events fetched successfully' }, 200);

    } catch (error) {
        console.error('Error:', error);
        return sendError('Failed to fetch Events: ' + error.message, 500);
    }
})

export const POST = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const file = formData.get('img');
        const itinerary = JSON.parse(formData.get('itinerary') || '[]');
        const inclusions = JSON.parse(formData.get('inclusions') || '[]');
        const exclusions = JSON.parse(formData.get('exclusions') || '[]');
        const activities = JSON.parse(formData.get('activities') || '[]');
        const duration = formData.get('duration');
        const bestTime = formData.get('bestTime');
        const maxElevation = formData.get('maxElevation');
        const route = formData.get('route');
        const difficulty = formData.get('difficulty');
        const location = formData.get('location');
        const subCategoryId = formData.get('subCategoryId');
        const ticketsData = JSON.parse(formData.get('tickets') || '[]');
        const video = formData.get('video');
        const guideLines = JSON.parse(formData.get('guideLines') || '[]');
        const FAQs = JSON.parse(formData.get('FAQs') || '[]');
        const policy = formData.get('policy');
        const rawDocuments = JSON.parse(formData.get('documents') || '[]');
        const basePrice = formData.get('basePrice');
        const status = formData.get('status');
        const documents = [];

        if (!title || !description || !file) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Title, description, image are required', 400);
        }

        const existingTitle = await Event.findOne({ title }).session(session);
        if (existingTitle) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event with this title already exists', 400);
        }

        const category = await categoryModel.findOne({
            'subCategories._id': subCategoryId,
            'subCategories.status': 'Active',
        }).session(session);

        if (!category) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Sub-category not found', 404);
        }

        const subCategory = category.subCategories.find(sub => sub._id.toString() === subCategoryId);

        if (!file || file.size === 0) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Image file is required', 400);
        }

        const processedFile = await processFormFile(file);
        const imagePath = await handleFileUpload(processedFile);

        for (const doc of rawDocuments) {
            const header = doc.header;
            if (!header) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Each document must have a header', 400);
            }

            const doc_img = formData.get(`${doc.headerKey}_img`);
            const doc_pdf = formData.get(`${doc.headerKey}_pdf`);

            const files = [doc_img, doc_pdf];

            if (files?.length < 2) {
                await session.abortTransaction();
                session.endSession();
                return sendError(`Both image and PDF are required for document "${header}"`, 400);
            }

            let imgFile = null;
            let pdfFile = null;

            for (const file of files) {
                if (file.type.includes('image')) {
                    imgFile = file;
                } else if (file.type === 'application/pdf') {
                    pdfFile = file;
                }
            }

            const processedImg = await processFormFile(imgFile);
            const processedPdf = await processFormFile(pdfFile);

            const imgUrl = await handleFileUpload(processedImg);
            const pdfUrl = await handleFileUpload(processedPdf);

            documents.push({
                header,
                imgUrl,
                pdfUrl,
            });

        }

        const ticketIds = [];
        for (const ticket of ticketsData) {
            if (!ticket.price || !ticket.startDate || !ticket.endDate || !ticket.status) {
                await session.abortTransaction();
                session.endSession();
                return sendError('Each ticket must have price, start date and end date', 400);
            }
            const newTicket = new Ticket({
                price: ticket.price,
                availableSlots: ticket.availableSlots,
                startDate: new Date(ticket.startDate),
                endDate: new Date(ticket.endDate),
                status: ticket.status || 'Available',
            });
            await newTicket.save({ session });
            ticketIds.push(newTicket._id);
        }

        const newSubEvent = new Event({
            title,
            description,
            slug: slugify(title, { lower: true, strict: true }),
            img: imagePath,
            itinerary,
            inclusions,
            exclusions,
            duration,
            bestTime,
            maxElevation,
            activities,
            route,
            difficulty,
            location,
            basePrice,
            subCategoryId,
            subCategorySlug: subCategory.slug,
            tickets: ticketIds,
            video,
            guideLines,
            FAQs,
            policy,
            documents,
            status: status || 'Active',
        });

        await newSubEvent.save({ session });

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ Event: newSubEvent, message: 'Event and tickets created successfully' }, 201);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error:', error);
        return sendError('Failed to create Event: ' + error.message, 500);
    }
})