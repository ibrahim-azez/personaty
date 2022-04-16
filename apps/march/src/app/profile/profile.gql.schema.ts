import gql from 'graphql-tag';

export const GET_USER_INFO = gql`
	query ($id: ID!) {
		getUser(id: $id) {
			fullName

			username

			profilePicture

			created_at

			bio

			tags

			stories {
				_id
				title
				description
				created_at
				photo
			}
		}
	}
`;