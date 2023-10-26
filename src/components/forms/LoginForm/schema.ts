import { setupYup } from "@/config/yup";

const Yup = setupYup();

const schema = Yup.object({
  usuario: Yup.string().required(),
  password: Yup.string().required(),
});

export default schema;
