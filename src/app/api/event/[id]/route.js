import Event from '@/src/lib/models/eventModel';
import ticketModel from '@/src/lib/models/ticketModel';
import { withDB } from '@/src/lib/utils/dbUtils';
import { sendSuccess, sendError } from '@/src/lib/utils/responseUtils';
import { processFormFile } from '@/src/lib/utils/uploadUtils';
import { deleteFileFromS3, handleFileUpload } from '@/src/lib/utils/awsUtils';
import mongoose from 'mongoose';
import categoryModel from '@/src/lib/models/categoryModel';

export const dynamic = 'force-dynamic';

export const GET = withDB(async (req) => {
    try {

        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            return sendError('Event ID is required', 400);
        }

        const events = await Event.findById(id).populate('tickets').lean();

        const category = await categoryModel.find({
            'subCategories._id': events.subCategoryId
        }).select('_id name slug').lean();

        events.category = category[0]

        if (!events) {
            return sendError('Event not found', 404);
        }

        return sendSuccess({ events, message: 'Event fetched successfully' }, 200);
    } catch (error) {
        return sendError(error.message, 500);
    }
})

export const PATCH = withDB(async (request) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = request.nextUrl;
        const id = pathname.split('/').pop();
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
        const documents = [];
        const basePrice = formData.get('basePrice');
        const status = formData.get('status');

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event ID is required', 400);
        }

        const existingEvent = await Event.findById(id).session(session);
        if (!existingEvent) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event not found', 404);
        }

        if (title) {
            existingEvent.title = title;
        }

        if (description) {
            existingEvent.description = description;
        }

        if (file) {
            if (existingEvent.img) {
                deleteFileFromS3(existingEvent.img);
            }

            const processedFile = await processFormFile(file);
            const imagePath = await handleFileUpload(processedFile);

            existingEvent.img = imagePath;
        }

        if (itinerary?.length > 0) {
            existingEvent.itinerary = itinerary;
        }

        if (inclusions?.length > 0) {
            existingEvent.inclusions = inclusions;
        }

        if (exclusions?.length > 0) {
            existingEvent.exclusions = exclusions;
        }

        if (activities?.length > 0) {
            existingEvent.activities = activities;
        }

        if (duration) {
            existingEvent.duration = duration;
        }

        if (bestTime) {
            existingEvent.bestTime = bestTime;
        }

        if (maxElevation) {
            existingEvent.maxElevation = maxElevation;
        }

        if (route) {
            existingEvent.route = route;
        }

        if (difficulty) {
            existingEvent.difficulty = difficulty;
        }

        if (location) {
            existingEvent.location = location;
        }

        if (subCategoryId) {
            existingEvent.subCategoryId = subCategoryId;
        }

        if (video) {
            existingEvent.video = video;
        }

        if (guideLines?.length > 0) {
            existingEvent.guideLines = guideLines;
        }

        if (FAQs?.length > 0) {
            existingEvent.FAQs = FAQs;
        }

        if (policy) {
            existingEvent.policy = policy;
        }

        if (basePrice) {
            existingEvent.basePrice = basePrice;
        }

        if (status) {
            existingEvent.status = status;
        }

        const existingDocs = existingEvent.documents || [];

        if (rawDocuments?.length > 0) {
            for (const doc of rawDocuments) {
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
                    header: doc.header,
                    imgUrl,
                    pdfUrl,
                });
            }
        }

        existingEvent.documents = [...existingDocs, ...documents];


        if (ticketsData) {
            if (Array.isArray(existingEvent.tickets)) {
                await ticketModel.deleteMany({ _id: { $in: existingEvent.tickets } }).session(session);
            } else {
                await ticketModel.findByIdAndDelete(existingEvent.tickets).session(session);
            }
            const ticketIds = [];
            for (const ticket of ticketsData) {

                if (!ticket.price || !ticket.startDate || !ticket.endDate || !ticket.status) {
                    await session.abortTransaction();
                    session.endSession();
                    return sendError('Each ticket must have price, start date and end date', 400);
                }

                const newTicket = new ticketModel({
                    price: ticket.price,
                    availableSlots: ticket.availableSlots,
                    startDate: new Date(ticket.startDate),
                    endDate: new Date(ticket.endDate),
                    status: ticket.status || 'Available',
                });

                await newTicket.save({ session });
                ticketIds.push(newTicket._id);
            }
            existingEvent.tickets = ticketIds;
        }

        await existingEvent.save({ session });
        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ Event: existingEvent, message: 'Event updated successfully' }, 200);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError(error.message, 500);
    }
})

export const DELETE = withDB(async (req) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { pathname } = req.nextUrl;
        const id = pathname.split('/').pop();

        if (!id) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event ID is required', 400);

        }

        const existingEvent = await Event.findById(id).session(session);
        if (!existingEvent) {
            await session.abortTransaction();
            session.endSession();
            return sendError('Event not found', 404);
        }

        const { img, documents, tickets } = existingEvent;

        if (img) {
            deleteFileFromS3(img);
        }

        if (documents && Array.isArray(documents)) {
            for (const doc of documents) {
                try {
                    deleteFileFromS3(doc.pdfUrl);
                    deleteFileFromS3(doc.imgUrl);
                } catch (e) {
                    console.warn('File deletion failed:', e.message);
                }
            }
        }

        if (tickets) {
            if (Array.isArray(tickets)) {
                await ticketModel.deleteMany({ _id: { $in: tickets } }).session(session);
            } else {
                await ticketModel.findByIdAndDelete(tickets).session(session);
            }
        }

        await Event.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

        return sendSuccess({ message: 'Event deleted successfully' }, 200);

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return sendError(error.message, 500);
    }
})  