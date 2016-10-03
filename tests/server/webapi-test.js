import { expect } from 'chai';

import express from 'express';
import request from 'supertest';

function getMockedWebApiSideEffect(webApi) {
	//console.log('webApi = ', webApi);
	let webApiInjector = require('inject!../../src/server/webapi');
	return webApiInjector({
		'../server/webapi_service': {
			loadWebApi: function() {
			},

			getWebApiInfo: function() {
				return webApi.info;
			},

			getWebApiPaths: function() {
				return Object.keys(webApi.paths);
			},

			getWebApiResource: function(path) {
				return webApi.paths[path];
			},

			getDefinitions: function(path) {
				return webApi.definitions;
			}
		}
	});
}

var webApiPetstore = {"swagger":"2.0","info":{"description":"This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.","version":"1.0.0","title":"Swagger Petstore","termsOfService":"http://swagger.io/terms/","contact":{"email":"apiteam@swagger.io"},"license":{"name":"Apache 2.0","url":"http://www.apache.org/licenses/LICENSE-2.0.html"}},"host":"petstore.swagger.io","basePath":"/v2","tags":[{"name":"pet","description":"Everything about your Pets","externalDocs":{"description":"Find out more","url":"http://swagger.io"}},{"name":"store","description":"Access to Petstore orders"},{"name":"user","description":"Operations about user","externalDocs":{"description":"Find out more about our store","url":"http://swagger.io"}}],"schemes":["http"],"paths":{"/pet":{"post":{"tags":["pet"],"summary":"Add a new pet to the store","description":"","operationId":"addPet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"put":{"tags":["pet"],"summary":"Update an existing pet","description":"","operationId":"updatePet","consumes":["application/json","application/xml"],"produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Pet object that needs to be added to the store","required":true,"schema":{"$ref":"#/definitions/Pet"}}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"},"405":{"description":"Validation exception"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByStatus":{"get":{"tags":["pet"],"summary":"Finds Pets by status","description":"Multiple status values can be provided with comma separated strings","operationId":"findPetsByStatus","produces":["application/xml","application/json"],"parameters":[{"name":"status","in":"query","description":"Status values that need to be considered for filter","required":true,"type":"array","items":{"type":"string","enum":["available","pending","sold"],"default":"available"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid status value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/findByTags":{"get":{"tags":["pet"],"summary":"Finds Pets by tags","description":"Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.","operationId":"findPetsByTags","produces":["application/xml","application/json"],"parameters":[{"name":"tags","in":"query","description":"Tags to filter by","required":true,"type":"array","items":{"type":"string"},"collectionFormat":"multi"}],"responses":{"200":{"description":"successful operation","schema":{"type":"array","items":{"$ref":"#/definitions/Pet"}}},"400":{"description":"Invalid tag value"}},"security":[{"petstore_auth":["write:pets","read:pets"]}],"deprecated":true}},"/pet/{petId}":{"get":{"tags":["pet"],"summary":"Find pet by ID","description":"Returns a single pet","operationId":"getPetById","produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to return","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Pet"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"api_key":[]}]},"post":{"tags":["pet"],"summary":"Updates a pet in the store with form data","description":"","operationId":"updatePetWithForm","consumes":["application/x-www-form-urlencoded"],"produces":["application/xml","application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet that needs to be updated","required":true,"type":"integer","format":"int64"},{"name":"name","in":"formData","description":"Updated name of the pet","required":false,"type":"string"},{"name":"status","in":"formData","description":"Updated status of the pet","required":false,"type":"string"}],"responses":{"405":{"description":"Invalid input"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]},"delete":{"tags":["pet"],"summary":"Deletes a pet","description":"","operationId":"deletePet","produces":["application/xml","application/json"],"parameters":[{"name":"api_key","in":"header","required":false,"type":"string"},{"name":"petId","in":"path","description":"Pet id to delete","required":true,"type":"integer","format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Pet not found"}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/pet/{petId}/uploadImage":{"post":{"tags":["pet"],"summary":"uploads an image","description":"","operationId":"uploadFile","consumes":["multipart/form-data"],"produces":["application/json"],"parameters":[{"name":"petId","in":"path","description":"ID of pet to update","required":true,"type":"integer","format":"int64"},{"name":"additionalMetadata","in":"formData","description":"Additional data to pass to server","required":false,"type":"string"},{"name":"file","in":"formData","description":"file to upload","required":false,"type":"file"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/ApiResponse"}}},"security":[{"petstore_auth":["write:pets","read:pets"]}]}},"/store/inventory":{"get":{"tags":["store"],"summary":"Returns pet inventories by status","description":"Returns a map of status codes to quantities","operationId":"getInventory","produces":["application/json"],"parameters":[],"responses":{"200":{"description":"successful operation","schema":{"type":"object","additionalProperties":{"type":"integer","format":"int32"}}}},"security":[{"api_key":[]}]}},"/store/order":{"post":{"tags":["store"],"summary":"Place an order for a pet","description":"","operationId":"placeOrder","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"order placed for purchasing the pet","required":true,"schema":{"$ref":"#/definitions/Order"}}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid Order"}}}},"/store/order/{orderId}":{"get":{"tags":["store"],"summary":"Find purchase order by ID","description":"For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions","operationId":"getOrderById","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of pet that needs to be fetched","required":true,"type":"integer","maximum":10.0,"minimum":1.0,"format":"int64"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/Order"}},"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}},"delete":{"tags":["store"],"summary":"Delete purchase order by ID","description":"For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors","operationId":"deleteOrder","produces":["application/xml","application/json"],"parameters":[{"name":"orderId","in":"path","description":"ID of the order that needs to be deleted","required":true,"type":"integer","minimum":1.0,"format":"int64"}],"responses":{"400":{"description":"Invalid ID supplied"},"404":{"description":"Order not found"}}}},"/user":{"post":{"tags":["user"],"summary":"Create user","description":"This can only be done by the logged in user.","operationId":"createUser","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"Created user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithArray":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithArrayInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/createWithList":{"post":{"tags":["user"],"summary":"Creates list of users with given input array","description":"","operationId":"createUsersWithListInput","produces":["application/xml","application/json"],"parameters":[{"in":"body","name":"body","description":"List of user object","required":true,"schema":{"type":"array","items":{"$ref":"#/definitions/User"}}}],"responses":{"default":{"description":"successful operation"}}}},"/user/login":{"get":{"tags":["user"],"summary":"Logs user into the system","description":"","operationId":"loginUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"query","description":"The user name for login","required":true,"type":"string"},{"name":"password","in":"query","description":"The password for login in clear text","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"type":"string"},"headers":{"X-Rate-Limit":{"type":"integer","format":"int32","description":"calls per hour allowed by the user"},"X-Expires-After":{"type":"string","format":"date-time","description":"date in UTC when token expires"}}},"400":{"description":"Invalid username/password supplied"}}}},"/user/logout":{"get":{"tags":["user"],"summary":"Logs out current logged in user session","description":"","operationId":"logoutUser","produces":["application/xml","application/json"],"parameters":[],"responses":{"default":{"description":"successful operation"}}}},"/user/{username}":{"get":{"tags":["user"],"summary":"Get user by user name","description":"","operationId":"getUserByName","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be fetched. Use user1 for testing. ","required":true,"type":"string"}],"responses":{"200":{"description":"successful operation","schema":{"$ref":"#/definitions/User"}},"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}},"put":{"tags":["user"],"summary":"Updated user","description":"This can only be done by the logged in user.","operationId":"updateUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"name that need to be updated","required":true,"type":"string"},{"in":"body","name":"body","description":"Updated user object","required":true,"schema":{"$ref":"#/definitions/User"}}],"responses":{"400":{"description":"Invalid user supplied"},"404":{"description":"User not found"}}},"delete":{"tags":["user"],"summary":"Delete user","description":"This can only be done by the logged in user.","operationId":"deleteUser","produces":["application/xml","application/json"],"parameters":[{"name":"username","in":"path","description":"The name that needs to be deleted","required":true,"type":"string"}],"responses":{"400":{"description":"Invalid username supplied"},"404":{"description":"User not found"}}}}},"securityDefinitions":{"petstore_auth":{"type":"oauth2","authorizationUrl":"http://petstore.swagger.io/oauth/dialog","flow":"implicit","scopes":{"write:pets":"modify pets in your account","read:pets":"read your pets"}},"api_key":{"type":"apiKey","name":"api_key","in":"header"}},"definitions":{"Order":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"petId":{"type":"integer","format":"int64"},"quantity":{"type":"integer","format":"int32"},"shipDate":{"type":"string","format":"date-time"},"status":{"type":"string","description":"Order Status","enum":["placed","approved","delivered"]},"complete":{"type":"boolean","default":false}},"xml":{"name":"Order"}},"Category":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Category"}},"User":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"username":{"type":"string"},"firstName":{"type":"string"},"lastName":{"type":"string"},"email":{"type":"string"},"password":{"type":"string"},"phone":{"type":"string"},"userStatus":{"type":"integer","format":"int32","description":"User Status"}},"xml":{"name":"User"}},"Tag":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}},"xml":{"name":"Tag"}},"Pet":{"type":"object","required":["name","photoUrls"],"properties":{"id":{"type":"integer","format":"int64"},"category":{"$ref":"#/definitions/Category"},"name":{"type":"string","example":"doggie"},"photoUrls":{"type":"array","xml":{"name":"photoUrl","wrapped":true},"items":{"type":"string"}},"tags":{"type":"array","xml":{"name":"tag","wrapped":true},"items":{"$ref":"#/definitions/Tag"}},"status":{"type":"string","description":"pet status in the store","enum":["available","pending","sold"]}},"xml":{"name":"Pet"}},"ApiResponse":{"type":"object","properties":{"code":{"type":"integer","format":"int32"},"type":{"type":"string"},"message":{"type":"string"}}}},"externalDocs":{"description":"Find out more about Swagger","url":"http://swagger.io"}};
var webapiMiddlewarePetstore = getMockedWebApiSideEffect(webApiPetstore);
var webApiAS = {
  "swagger" : "2.0",
  "info" : {
    "description" : "",
    "version" : "1.1.0",
    "title" : "testgeneration",
    "contact" : {
      "name" : "Thierry Templier",
      "email" : "ttemplier@restlet.com"
    }
  },
  "host" : "testgeneration.apihive.com",
  "basePath" : "/v1",
  "tags" : [ {
    "name" : "testgeneration_Data",
    "description" : "Imported from testgeneration_Data"
  }, {
    "name" : "Default",
    "description" : "Default section"
  } ],
  "schemes" : [ "https" ],
  "paths" : {
    "/companies/" : {
      "get" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Loads a list of Company",
        "description" : "Loads a list of Company",
        "operationId" : "getCompanies",
        "consumes" : [ ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "name",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field name",
          "required" : false,
          "type" : "string",
          "x-example" : "sample name"
        }, {
          "name" : "$sort",
          "in" : "query",
          "description" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $sort"
        }, {
          "name" : "$page",
          "in" : "query",
          "description" : "Number of the page to retrieve. Integer value.",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $page"
        }, {
          "name" : "$size",
          "in" : "query",
          "description" : "Size of the page to retrieve. Integer value",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $size"
        }, {
          "name" : "id",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field id",
          "required" : false,
          "type" : "string",
          "x-example" : "sample id"
        }, {
          "name" : "tags",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field tags",
          "required" : false,
          "type" : "string",
          "x-example" : "sample tags"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Company"
              }
            }
          },
          "400" : {
            "description" : "Error 400"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "post" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Adds a Company",
        "description" : "Adds a Company",
        "operationId" : "postCompanies",
        "consumes" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "body",
          "required" : false,
          "schema" : {
            "$ref" : "#/definitions/Company"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Company"
            }
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      }
    },
    "/companies/{companyid}" : {
      "get" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Loads a Company",
        "description" : "Loads a Company",
        "operationId" : "getCompaniesCompanyid",
        "consumes" : [ ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "companyid",
          "in" : "path",
          "description" : "Identifier of the Company",
          "required" : true,
          "type" : "string",
          "x-example" : "sample companyid"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Company"
            }
          },
          "400" : {
            "description" : "Error 400"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "put" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Stores a Company",
        "description" : "Stores a Company",
        "operationId" : "putCompaniesCompanyid",
        "consumes" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "companyid",
          "in" : "path",
          "description" : "Identifier of the Company",
          "required" : true,
          "type" : "string",
          "x-example" : "sample companyid"
        }, {
          "in" : "body",
          "name" : "body",
          "required" : false,
          "schema" : {
            "$ref" : "#/definitions/Company"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Company"
            }
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "delete" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Deletes a Company",
        "description" : "Deletes a Company",
        "operationId" : "deleteCompaniesCompanyid",
        "consumes" : [ ],
        "produces" : [ ],
        "parameters" : [ {
          "name" : "companyid",
          "in" : "path",
          "description" : "Identifier of the Company",
          "required" : true,
          "type" : "string",
          "x-example" : "sample companyid"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      }
    },
    "/contacts/" : {
      "get" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Loads a list of Contact",
        "description" : "Loads a list of Contact",
        "operationId" : "getContacts",
        "consumes" : [ ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "company",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field company",
          "required" : false,
          "type" : "string",
          "x-example" : "sample company"
        }, {
          "name" : "active",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field active",
          "required" : false,
          "type" : "string",
          "x-example" : "sample active"
        }, {
          "name" : "lastName",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field lastName",
          "required" : false,
          "type" : "string",
          "x-example" : "sample lastName"
        }, {
          "name" : "$page",
          "in" : "query",
          "description" : "Number of the page to retrieve. Integer value.",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $page"
        }, {
          "name" : "id",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field id",
          "required" : false,
          "type" : "string",
          "x-example" : "sample id"
        }, {
          "name" : "rank",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field rank",
          "required" : false,
          "type" : "string",
          "x-example" : "sample rank"
        }, {
          "name" : "$sort",
          "in" : "query",
          "description" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $sort"
        }, {
          "name" : "$size",
          "in" : "query",
          "description" : "Size of the page to retrieve. Integer value",
          "required" : false,
          "type" : "string",
          "x-example" : "sample $size"
        }, {
          "name" : "birthday",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field birthday",
          "required" : false,
          "type" : "string",
          "x-example" : "sample birthday"
        }, {
          "name" : "firstName",
          "in" : "query",
          "description" : "Allows to filter the collections of result by the value of field firstName",
          "required" : false,
          "type" : "string",
          "x-example" : "sample firstName"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/Contact"
              }
            }
          },
          "400" : {
            "description" : "Error 400"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "post" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Adds a Contact",
        "description" : "Adds a Contact",
        "operationId" : "postContacts",
        "consumes" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "in" : "body",
          "name" : "body",
          "required" : false,
          "schema" : {
            "$ref" : "#/definitions/Contact"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Contact"
            }
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      }
    },
    "/contacts/{contactid}" : {
      "get" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Loads a Contact",
        "description" : "Loads a Contact",
        "operationId" : "getContactsContactid",
        "consumes" : [ ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "contactid",
          "in" : "path",
          "description" : "Identifier of the Contact",
          "required" : true,
          "type" : "string",
          "x-example" : "sample contactid"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Contact"
            }
          },
          "400" : {
            "description" : "Error 400"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "put" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Stores a Contact",
        "description" : "Stores a Contact",
        "operationId" : "putContactsContactid",
        "consumes" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "produces" : [ "application/json", "application/x-yaml", "application/xml", "text/xml" ],
        "parameters" : [ {
          "name" : "contactid",
          "in" : "path",
          "description" : "Identifier of the Contact",
          "required" : true,
          "type" : "string",
          "x-example" : "sample contactid"
        }, {
          "in" : "body",
          "name" : "body",
          "required" : false,
          "schema" : {
            "$ref" : "#/definitions/Contact"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "Success",
            "schema" : {
              "$ref" : "#/definitions/Contact"
            }
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      },
      "delete" : {
        "tags" : [ "testgeneration_Data" ],
        "summary" : "Deletes a Contact",
        "description" : "Deletes a Contact",
        "operationId" : "deleteContactsContactid",
        "consumes" : [ ],
        "produces" : [ ],
        "parameters" : [ {
          "name" : "contactid",
          "in" : "path",
          "description" : "Identifier of the Contact",
          "required" : true,
          "type" : "string",
          "x-example" : "sample contactid"
        } ],
        "responses" : {
          "200" : {
            "description" : "Success"
          }
        },
        "security" : [ {
          "HTTP_BASIC" : [ ]
        } ]
      }
    }
  },
  "securityDefinitions" : {
    "HTTP_BASIC" : {
      "type" : "basic"
    }
  },
  "definitions" : {
    "Company" : {
      "type" : "object",
      "required" : [ "address", "id", "name" ],
      "properties" : {
        "address" : {
          "type" : "object",
          "properties" : {
            "city" : {
              "type" : "string",
              "example" : "sample city"
            },
            "street" : {
              "type" : "string",
              "example" : "sample street"
            },
            "zipcode" : {
              "type" : "string",
              "example" : "sample zipcode"
            }
          },
          "required" : [ "city", "street", "zipcode" ]
        },
        "id" : {
          "type" : "string",
          "example" : "sample id",
          "description" : "Auto-generated primary key field"
        },
        "name" : {
          "type" : "string",
          "example" : "sample name"
        },
        "tags" : {
          "type" : "array",
          "items" : {
            "type" : "string",
            "example" : "sample tags"
          }
        }
      },
      "example" : "{\"id\":\"sample id\",\"name\":\"sample name\",\"tags\":[\"sample tags\"],\"address\":{\"address\":\"sample city\"}}"
    },
    "Contact" : {
      "type" : "object",
      "required" : [ "firstName", "id", "lastName" ],
      "properties" : {
        "active" : {
          "type" : "boolean",
          "example" : false,
          "default" : false
        },
        "birthday" : {
          "type" : "integer",
          "format" : "int64",
          "example" : 123456789
        },
        "company" : {
          "type" : "string",
          "example" : "sample company",
          "description" : "This property is a reference to a Company"
        },
        "firstName" : {
          "type" : "string",
          "example" : "sample firstName"
        },
        "id" : {
          "type" : "string",
          "example" : "sample id",
          "description" : "Auto-generated primary key field"
        },
        "lastName" : {
          "type" : "string",
          "example" : "sample lastName"
        },
        "rank" : {
          "type" : "integer",
          "format" : "int32",
          "example" : 1
        }
      },
      "example" : "{\"id\":\"sample id\",\"firstName\":\"sample firstName\",\"lastName\":\"sample lastName\",\"birthday\":123456789,\"active\":false,\"rank\":1,\"company\":\"sample company\"}"
    }
  }
};
var webapiMiddlewareAS = getMockedWebApiSideEffect(webApiAS);

const appPetstore = express();
appPetstore.use('/api', webapiMiddlewarePetstore.default);

const appAS = express();
appAS.use('/api', webapiMiddlewareAS.default);

function expectNotNullAndUndefined(obj) {
	expect(obj).not.to.be.null;
	expect(obj).not.to.be.undefined;
}

describe('server', () => {
	describe('webapi', () => {
		it('should return resource hints for an existing path (petstore)', (done) => {
			request(appPetstore)
				.get('/api/pet/%7BpetId%7D')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res){
					if (err) throw err;

					let payload = res.body;
					expectNotNullAndUndefined(payload.details);
					expect(Object.keys(payload.details)).to.have.length(3);
					expectNotNullAndUndefined(payload.details.get);
					expectNotNullAndUndefined(payload.details.post);
					expectNotNullAndUndefined(payload.details.delete);

					expectNotNullAndUndefined(payload.definitions);
					expect(Object.keys(payload.definitions)).to.have.length(6);
					expectNotNullAndUndefined(payload.definitions.Order);
					expectNotNullAndUndefined(payload.definitions.Category);
					expectNotNullAndUndefined(payload.definitions.User);
					expectNotNullAndUndefined(payload.definitions.Tag);
					expectNotNullAndUndefined(payload.definitions.Pet);
					expectNotNullAndUndefined(payload.definitions.ApiResponse);

					done();
				});
		});

		it('should return 404 for a missing path (petstore)', (done) => {
			request(appPetstore)
				.get('/api/books')
				.expect(404, 'Not Found')
				.end(function(err, res){
				   if (err) throw err;
					done();
				});
		});

		it('should return resource hints for an existing path (as)', (done) => {
			request(appAS)
				.get('/api/companies/%7Bcompanyid%7D')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res){
					if (err) throw err;

					let payload = res.body;
					expectNotNullAndUndefined(payload.details);
					expect(Object.keys(payload.details)).to.have.length(3);
					expectNotNullAndUndefined(payload.details.get);
					expectNotNullAndUndefined(payload.details.put);
					expectNotNullAndUndefined(payload.details.delete);

					expectNotNullAndUndefined(payload.definitions);
					expect(Object.keys(payload.definitions)).to.have.length(2);
					expectNotNullAndUndefined(payload.definitions.Company);
					expectNotNullAndUndefined(payload.definitions.Contact);

					done();
				});
		});

		it('should return 404 for a missing path (as)', (done) => {
			request(appAS)
				.get('/api/books')
				.expect(404, 'Not Found')
				.end(function(err, res){
				   if (err) throw err;
					done();
				});
		});
	});
});