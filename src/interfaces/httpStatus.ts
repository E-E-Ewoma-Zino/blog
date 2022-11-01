// All http status and meaning

interface IStatusCode {
	OK_200: number,
	CREATED_201: number,
	ACCPTED_202: number,
	NO_CONTENT_204: number,
	RESET_CONTENT_205: number,
	NOT_MODIFIED_304: number,
	BAD_REQUEST_400: number,
	UNAUTHORIZED_401: number,
	FORBIDDEN_403: number,
	NOT_FOUND_404: number,
	NOT_ALLOWED_405: number,
	REQUEST_TIMEOUT_408: number,
	CONFLICT_409: number,
	UNAVALIABLE_410: number,
	UNSUPPORTED_MEIDA_TYPE_415: number,
	TOO_MANY_REQ_429: number,
	SERVER_ERR_500: number,
	SERVICE_UNAVALIABLE_503: number
}

export default IStatusCode;
