# Election Day API
This api can be use though heroku

## Routes 
#### Get

/welcome

#### Post

`/auth/login` accept: email, and password

`/auth/register` accept: email, and password

# API
All api are get route. The work in this partten
api/:schema/:method
`:schema` stands for the db to call from eg users, or parties,
while `:method` stands for the function to call eg all, byid etc

###
Here is a list of all the avaliable methods

#### all
The `all` method get all documents in the seleted schema, the useage is as follows `/api/users/all`

#### byid
The `byid` method get documents by the Id passed using the query string `id` the useage is as follows `/api/users/byid?id=0293u932n0oivjoiouwi9802`

#### populated
The `populated` method get all documents in the seleted schema and populated nexted doc. Eg if there is a nexting of other documents in the schema that you are calling from, then to populate the returned document with that document you must add the populate `opt`. The useage is as follows `/api/users/populated?opt=parties` this will populagte the user document with the parties thay are in.

#### populatebyid
The `populatebyid` method gets a selected document is a seleted schema and populates it. The useage is as follows `/api/users/populatedbyid?id=839oniu3eji32uionjioi&opt=parties`

### Expected result for `all`
```
{
"message": "Found items",
"err": null,
"status": 200,
"alert": "success",
"data": [3 items]
}
```

## Website
https://www.election-day.herokuapp.com

#### List of all constructors

|Status Code|Constructor Name             |
|-----------|-----------------------------|
|400        |BadRequest✔                  |
|401        |Unauthorized✔                |
|402        |PaymentRequired✔             |
|403        |Forbidden✔                   |
|404        |NotFound✔                    |
|405        |MethodNotAllowed✔            |
|406        |NotAcceptable✔               |
|407        |ProxyAuthenticationRequired  |
|408        |RequestTimeout               |
|409        |Conflict✔                    |
|410        |Gone                         |
|411        |LengthRequired               |
|412        |PreconditionFailed           |
|413        |PayloadTooLarge              |
|414        |URITooLong                   |
|415        |UnsupportedMediaType✔        |
|416        |RangeNotSatisfiable          |
|417        |ExpectationFailed            |
|418        |ImATeapot                    |
|421        |MisdirectedRequest           |
|422        |UnprocessableEntity          |
|423        |Locked                       |
|424        |FailedDependency             |
|425        |UnorderedCollection          |
|426        |UpgradeRequired              |
|428        |PreconditionRequired         |
|429        |TooManyRequests              |
|431        |RequestHeaderFieldsTooLarge  |
|451        |UnavailableForLegalReasons   |
|500        |InternalServerError✔         |
|501        |NotImplemented               |
|502        |BadGateway                   |
|503        |ServiceUnavailable           |
|504        |GatewayTimeout               |
|505        |HTTPVersionNotSupported      |
|506        |VariantAlsoNegotiates        |
|507        |InsufficientStorage          |
|508        |LoopDetected                 |
|509        |BandwidthLimitExceeded       |
|510        |NotExtended                  |
|511        |NetworkAuthenticationRequired|