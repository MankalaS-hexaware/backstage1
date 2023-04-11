var Generator = require('yeoman-generator');
var fs = require('fs');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        console.log("pythonentities",this.options.data.entities);
    }


    writing() {
        var data = this.options.data
        var project = data.com_name
        this.log(data.models)
        var models = data.entities

        var destination = this.destinationRoot()
        this.log(`destination : ${destination}`)

        
        console.log(`${destination}/main.py : ${this.fs.exists(`${destination}\\main.py`)}`)
        if (!this.fs.exists(`${destination}\\main.py`)) {
            this.log("main.py not present")
            return false;
        }
        this._addEntity(project, models);
        var data = this.fs.read(`${destination}\\main.py`)
        var imports = ""
        var routes = ""
        for (var i = 0; i < models.length; i++) {
            var title = models[i]['name'].charAt(0).toUpperCase() + models[i]['name'].slice(1);
            imports += "from api import " + title + "API\n"
            routes += "app.include_router(" + title + "API.router, tags=[\"" + title.toLowerCase() + "\"])\n"
        }
        data = imports + data + routes
        this.fs.write(`${destination}\\main.py`, data);
        

    }

    _convertTypesForPython(attrs) {
        var new_attrs = [];
        for (var i = 0; i < attrs.length; i++) {
            var type = attrs[i]["datatype"].toLowerCase();
            var actualType = "";
            var mongoField = "";
            if (type == "int") {
                actualType = "int"
                mongoField = "IntField"
            } else if (type == "string") {
                actualType = "str"
                mongoField = "StringField"
            } else if (type == "bool"){
                actualType = "bool"
                mongoField = "BooleanField"
            } else if (type == "decimal"){
                actualType = "float"
                mongoField = "DecimalField"
            }
            new_attrs.push({"name": attrs[i]["name"], "type":{"original": type, "actual": actualType, "mongofield": mongoField}})

        }
        return new_attrs
    }

    _addEntity(project, models) {

        for (let i = 0; i < models.length; i++) {
            var model = models[i]['name'].charAt(0).toUpperCase() + models[i]['name'].slice(1);
            var attrs = this._convertTypesForPython(models[i]['fields'])
            console.log(attrs)
            this.fs.copyTpl(
                this.templatePath('API_FILE.ejs'),
                this.destinationPath('api/' + model + 'API.py'),
                { model: model, attrs: attrs }
            )

            this.fs.copyTpl(
                this.templatePath('CONTROLLER.ejs'),
                this.destinationPath('business/' + model + 'Logic.py'),
                { model: model, attrs: attrs }
            )

            this.fs.copyTpl(
                this.templatePath('DB_CRUD.ejs'),
                this.destinationPath('db/crud/' + model + 'CRUD.py'),
                { model: model, attrs: attrs }
            )

            this.fs.copyTpl(
                this.templatePath('MODEL.ejs'),
                this.destinationPath('db/models/' + model + '.py'),
                { model: model, attrs: attrs, collection: models[i]['name'], project: project }
            )

            this.fs.copyTpl(
                this.templatePath('catalog-info.yaml'),
                this.destinationPath('catalog-info.yaml')
               
            )

            this.fs.copyTpl(
                this.templatePath('SCHEMA.ejs'),
                this.destinationPath('schema/' + model + '.py'),
                { model: model, attrs: attrs }
            )
        }
    }
}
