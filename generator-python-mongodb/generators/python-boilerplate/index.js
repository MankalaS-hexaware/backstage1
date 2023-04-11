var Generator = require('yeoman-generator');
var fs = require('fs');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    writing() {
        var data = this.options.data
        var project = data.com_name

        var destination = this.destinationRoot()
        this.log(`destination : ${destination}`)

        this._copyStaticTemplates(project);

    }
    
    _copyStaticTemplates(project) {
        
        this.fs.copyTpl(
            this.templatePath("main.ejs"),
            this.destinationPath("main.py")
        )

        this.fs.copyTpl(
            this.templatePath('business'),
            this.destinationPath('business')
        )

        this.fs.copyTpl(
            this.templatePath('core'),
            this.destinationPath('core'),
            { project: project }
        )

        this.fs.copyTpl(
            this.templatePath('db'),
            this.destinationPath('db')
        )


        this.fs.copyTpl(
            this.templatePath("Dockerfile"),
            this.destinationPath("Dockerfile")
        )

        this.fs.copyTpl(
            this.templatePath(".dockerignore"),
            this.destinationPath(".dockerignore")
        )

        this.fs.copyTpl(
            this.templatePath(".gitignore"),
            this.destinationPath(".gitignore")
        )

        this.fs.copyTpl(
            this.templatePath("Pipfile"),
            this.destinationPath("Pipfile")
        )

        this.fs.copyTpl(
            this.templatePath("Pipfile.lock"),
            this.destinationPath("Pipfile.lock")
        )

        this.fs.copyTpl(
            this.templatePath(".env"),
            this.destinationPath(".env"),
            { project: project }
        )
    }
}
