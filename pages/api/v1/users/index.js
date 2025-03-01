import controller from "infra/controller";
import user from "models/user.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  console.log("teste ");

  const newUser = await user.create(userInputValues);

  return response.status(201).json(newUser);
}
