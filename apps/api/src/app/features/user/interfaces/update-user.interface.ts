import { TImage } from '@modules/image/utils/types/image.type';

export interface IUpdateUser {
	authToken: string;

	profilePicture: TImage;

	profileCover: TImage;

	attrs: object;
}
