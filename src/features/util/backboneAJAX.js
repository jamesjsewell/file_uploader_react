
export function backbone_create(collection, item, onError, onSuccess) {

    var successMessage = "created item"

    function handleResponse(response){
        parse_response(response, onError, onSuccess, successMessage)
    }

    collection.create(
        item,
        {
            wait: true,
            success: handleResponse, //onSuccess,
            error: (response) => { console.log(response) }//onError
        }
    )

}

export function backbone_read(collection, queryObj, onError, onSuccess) {

    var successMessage = "fetched items"

    function handleResponse(response){
        parse_response(response, onError, onSuccess, successMessage)
    }

    collection.fetch(
        {
            data: queryObj ? queryObj : null,
            wait: true,
            success: handleResponse,
            error: onError
        }
    )

}

export function backbone_update(collection, item, updated, onError, onSuccess) {
    
    var model = collection.get(item._id)

    var successMessage = "updated item"

    function handleResponse(response){
        parse_response(response, onError, onSuccess, successMessage)
    }

    if (model) {

        model.save( 
            updated,
            {   
                merge: true,
                wait: true,
                success: handleResponse,
                error: onError
            }
        )

    }

}

export function backbone_delete(collection, id, onError, onSuccess) {

    var model = collection.get(id)
    
    var successMessage = "removed item"

    function handleResponse(response){
        parse_response(collection, onError, onSuccess, successMessage)
    }

    if (model) {

        model.destroy( 
            
            {
                success: handleResponse,
                error: (err) => { console.log(err) },//onError,
                wait: true
            }
        )

    }

}

function parse_response(response, onError, onSuccess, message) {
    
    var error = false
    var collection = response

    console.log(response)

    if(response.attributes && response.attributes.error){

        onError(response.attributes.message)

    }
    else{

        if(response.collection){
            collection = response.collection
        }

        
        new onSuccess(collection, message)

    }

}


