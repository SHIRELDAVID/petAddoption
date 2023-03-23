const joi = require("@hapi/joi");

const signupSchema = joi.object({
  name: joi.string().required().max(20),
  email: joi.string().email().required(),
  password: joi.string().required().min(6).max(24),
  role: joi.number(),
  lastname: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6).max(24),
});

const updateUserSchema = joi.object({
  name: joi.string().max(20),
  email: joi.string().email(),
  password: joi.string().min(6).max(24),
  role: joi.number(),
  lastname: joi.string(),
  pets: joi.array(),
  savedPets: joi.array(),
  $__: joi.object(),
  $isNew: joi.boolean()
});

const createPetSchema = joi.object({
  name: joi.string().required(),
  type: joi.string().required(),
  breed: joi.string().required(),
  age: joi.number().required(),
  status: joi.string().required(),
  bio: joi.string().required(),
  image: joi.string().required(),
  height: joi.number().required(),
  weight: joi.number().required(),
  color: joi.string().required(),
  hypoallergenic: joi.boolean().required(),
  dietaryRestrictions: joi.string(),
});

const updatePetSchema = joi.object({
  name: joi.string(),
  type: joi.string(),
  breed: joi.string(),
  age: joi.number(),
  status: joi.string(),
  bio: joi.string(),
  image: joi.string(),
  height: joi.number(),
  weight: joi.number(),
  color: joi.string(),
  hypoallergenic: joi.boolean(),
  dietaryRestrictions: joi.string(),
});

const statusChangerSchema = joi.object({
  petId: joi.string().required(),
  userId: joi.string()
});

const queryIdSchema = joi.object({
  id: joi.string().required(),
});
const validationSchema = (req, res, next) => {
  const { path } = req.route;
  const { body } = req;

  switch (path) {
    case "/signup":
      const { error } = signupSchema.validate(body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      break;
    case "/login":
      const { error: errorLogin } = loginSchema.validate(body);
      if (errorLogin) {
        return res.status(400).json({ message: errorLogin.message });
      }
      break;
    case "/update/:id":
      const { error: errorUpdate } = updateUserSchema.validate(body);
      if (errorUpdate) {
        return res.status(400).json({ message: errorUpdate.message });
      }
      break;
    case "/createPet":
      const { error: errorCreatePet } = createPetSchema.validate(body);
      if (errorCreatePet) {
        return res.status(400).json({ message: errorCreatePet.message });
      }
      break;
    case "/updatePet/:id":
      const { error: errorUpdatePet } = updatePetSchema.validate(body);
      if (errorUpdatePet) {
        return res.status(400).json({ message: errorUpdatePet.message });
      }
      break;
    case "/adopt":
      const { error: errorAdopt } = statusChangerSchema.validate(body);
      if (errorAdopt) {
        return res.status(400).json({ message: errorAdopt.message });
      }
      break;
    case "/foster":
      const { error: errorFoster } = statusChangerSchema.validate(body);
      if (errorFoster) {
        return res.status(400).json({ message: errorFoster.message });
      }
      break;
    case "/return":
      const { error: errorReturn } = statusChangerSchema.validate(body);
      if (errorReturn) {
        return res.status(400).json({ message: errorReturn.message });
      }
      break;
    case "/delete/:id":
      const { error: errorDelete } = queryIdSchema.validate(req.params);
      if (errorDelete) {
        return res.status(400).json({ message: errorDelete.message });
      }
      break;
    case "/getById/:id":
      const { error: errorGetPet } = queryIdSchema.validate(req.params);
      if (errorGetPet) {
        return res.status(400).json({ message: errorGetPet.message });
      }
      break;
    default:
      break;
  }
  next();
};

module.exports = validationSchema;
