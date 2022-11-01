export interface IServerResponseArray<T> {
	message: String,
	err: Error | String | null,
	data: Array<T>,
	alert: String,
	status: number
}

export interface IServerResponse<T> {
	message: String,
	err: Error | String | null,
	data?: T,
	alert: String,
	status: number
}