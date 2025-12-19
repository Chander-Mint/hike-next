import mongoose from 'mongoose';
import slugify from 'slugify';

const subCategorySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    img: { type: [String], required: true },
    bannerImg: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
}, { _id: true });

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    categoryImg: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    subCategories: [subCategorySchema],
}, { timestamps: true });

categorySchema.pre('validate', function (next) {
    if (!this.slug && this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    this.subCategories = this.subCategories.map(sub => ({
        ...sub.toObject(),
        slug: sub.slug || slugify(sub.title, { lower: true, strict: true }),
    }));

    next();
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
