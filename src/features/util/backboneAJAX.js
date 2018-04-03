
export function backbone_create(collection, item, onError, onSuccess) {

    collection.create(
        item,
        {
            wait: true,
            success: (response) => { parse_response(response, onError, onSuccess) }, //onSuccess,
            error: (error) => { onError(error) }//onError
        }
    )

}

export function backbone_read(collection, queryObj, onError, onSuccess) {

    collection.fetch(
        {
            data: queryObj ? queryObj : null,
            wait: true,
            success: (response) => { parse_response(response, onError, onSuccess) },
            error: onError
        }
    )

}

export function backbone_update(collection, id, updated, onError, onSuccess) {

    var model = collection.get(id)

    if (model) {

        model.set(updated)

        model
            .save()
            .done((response) => {
                console.log(response)
                //collection.reset(collection.models, model)
                //var updatedModel = collection.get(id)
                //onSuccess()
            })
            .fail(function (err) {
                console.log(err)
                //onError()
            })

    }

}

export function backbone_delete(collection, id, onError, onSuccess) {

    var model = collection.get(id)
    console.log(collection)

    if (model) {

        model.destroy( 
            
            {
                success: (model, response, options) => { 
                    console.log(collection)
                    parse_response(collection, onError, onSuccess) }, //onSuccess,
                error: (err) => { console.log(err) },//onError,
                wait: true
            }
        )

    }

}

function parse_response(response, onError, onSuccess) {

    var error = false
    var collection = response
    var models = []

    if(response.models){
        models = response.models

    }

    if(response.collection){
        collection = response.collection
        models = response.collection.models
    }

    if(models[0]){

        var firstModel = models[0]

        if(firstModel.attributes){

            var attributes = firstModel.attributes

            if(attributes.error){
                error = true
            }

        }
    }

    if(error){

        var errorMessage = {error: true, message: attributes.message }
        onError(errorMessage)
        
    }
    else{
        console.log(collection)
        onSuccess(collection)

    }

}


