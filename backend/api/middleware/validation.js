const Joi = require('joi');

const validateProperty = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().max(100),
        address: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            zipCode: Joi.string().required(),
            coordinates: Joi.object({
                lat: Joi.number(),
                lng: Joi.number()
            })
        }).required(),
        propertyType: Joi.string().valid('house', 'apartment', 'condo', 'townhouse', 'land', 'commercial').required(),
        listingType: Joi.string().valid('sale', 'rent', 'lease').required(),
        features: Joi.object({
            bedrooms: Joi.number().min(0).required(),
            bathrooms: Joi.number().min(0).required(),
            squareFeet: Joi.number().min(0).required(),
            yearBuilt: Joi.number(),
            parking: Joi.number().default(0),
            lotSize: Joi.number(),
            furnished: Joi.boolean().default(false)
        }).required(),
        price: Joi.object({
            amount: Joi.number().min(0).required(),
            currency: Joi.string().valid('USD', 'EUR', 'GBP', 'NGN').default('USD')
        }).required(),
        description: Joi.string().required().max(2000)
    });

    return schema.validate(data);
};

const validateAgent = (data) => {
    const schema = Joi.object({
        name: Joi.object({
            first: Joi.string().required(),
            last: Joi.string().required()
        }).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/).required(),
        address: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            zipCode: Joi.string().required()
        }).required(),
        bio: Joi.string().max(500),
        specializations: Joi.array().items(
            Joi.string().valid(
                'residential', 'commercial', 'luxury', 'investment',
                'rental', 'international', 'new-construction', 'foreclosure'
            )
        ),
        license: Joi.object({
            number: Joi.string().required(),
            state: Joi.string().required(),
            expiryDate: Joi.date()
        }).required()
    });

    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(data);
};

const validateUserRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        name: Joi.object({
            first: Joi.string(),
            last: Joi.string()
        }),
        phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
        preferences: Joi.object({
            propertyTypes: Joi.array().items(
                Joi.string().valid("house", "apartment", "condo", "townhouse", "land", "commercial")
            ),
            priceRange: Joi.object({
                min: Joi.number(),
                max: Joi.number()
            }),
            locations: Joi.array().items(Joi.string()),
            notifications: Joi.object({
                email: Joi.boolean(),
                push: Joi.boolean()
            })
        })
    });

    return schema.validate(data);
};

const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        next();
    };
};

module.exports = {
    validateProperty,
    validateAgent,
    validateLogin,
    validate,
    validateUserRegistration
};
