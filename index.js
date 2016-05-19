'use strict'

let INVALID_CONTENT_TYPE = '{"status":"fail","message":"Not Acceptable request, content type will be application/json."}'
  , baseApiPath = null
  ;

function apiGet(req, res) {
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    let object_id = request_path[1];
    this.storage.list(resource, {_id: object_id}, function(list){
        res.send(JSON.stringify(list, null, 4));
    });
}

function apiPost(req, res) {
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    this.storage.save(resource, req.body, function(saveData){
        res.send(JSON.stringify(saveData), null, 4);
    })
}

function apiPut(req, res) {
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    let object_id = request_path[1];
    this.storage.update(resource, {_id: object_id}, req.body, function(updateData){
        res.send(JSON.stringify(updateData, null, 4));
    });
}

function apiDelete(req, res) {
    let tplName = req.params.url;
    let request_path = tplName.split("/");
    let resource = request_path[0];
    let object_id = request_path[1];
    this.storage.remove(resource, {_id: object_id}, function(deleted){
        res.send(JSON.stringify(deleted, null, 4));
    });
}

let routes = {
    "/api/:url([a-z]*)?": {
        "get": apiGet,
        "post": apiPost,
        "put": apiPut,
        "patch": apiPut,
        "delete": apiDelete
    }
}

module.exports = routes;