import { CompleteProfileController } from "../../../../../presentation/http/user/controllers/complete-profile.controller";
import { makeCompleteProfileUseCase } from "../../../application/user/make-complete-profile-usecase";

export function makeCompleteProfileController(): CompleteProfileController {
  return new CompleteProfileController(makeCompleteProfileUseCase());
}
