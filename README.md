# Description

Schematics to scaffold basic module files using clean architecture in Angular CLI enviroment.

# Usage
* On your Angular CLI project just `npm i ng-make-it-clean`;
* to use this lib: `ng g ng-make-it-clean:all --name module-name`;

Some aditional params:
* `--alias alias`: Starts the component's selector with this alias;
* `--pug true/false`: if false, create component's template file using default HTML; creates it using pug otherwise;

# Schematics

To generate code using this schematics, just type `ng g ng-make-it-clean:SCHEMATIC --params...` where SCHEMATIC is one of the keys below:

* to generate just the presenter's submodule, use `presenter` (shortcut `p`);
* to generate just the domain submodule, use `domain` (shortcut `d`);
* to generate just the data submodule, use `data` (shortcut `r`);
* to genarate all the above submodules use `all` (shortcut: `a`).

# Generated code

This files are created into `/src/app/` folder.

* presenter
```
src
'---app
    '---module-name
        '---presentation
            |---module-name
            |   |---module-name.component.html
            |   '---module-name.component.ts
            |---presenter
            |   '---default-module-name.presenter.ts
            |---module-name.presentation.module.ts
            '---module-name.routing.ts
```

* domain
```
src
'---app
    '---module-name
        '---domain
            |---boundaries
            |   |---module-name.gateway.ts
            |   '---module-name.presenter.ts
            |---services
            |   '---module-name.service.ts
            '---module-name.domain.module.ts
```

* data
```
src
'---app
    '---module-name
        '---data
            |---default-module-name.gateway.ts
            |---module-name.module.ts
            '---module-name.repository.ts
```

* all
```
src
'---app
    '---module-name
        |---data
        |   |---default-module-name.gateway.ts
        |   |---module-name.module.ts
        |   '---module-name.repository.ts
        |---domain
        |   |---boundaries
        |   |   |---module-name.gateway.ts
        |   |   '---module-name.presenter.ts
        |   |---services
        |   |   '---module-name.service.ts
        |   '---module-name.domain.module.ts
        |---presentation
        |   |---module-name
        |   |   |---module-name.component.html
        |   |   '---module-name.component.ts
        |   |---presenter
        |   |   '---default-module-name.presenter.ts
        |   |---module-name.presentation.module.ts
        |   '---module-name.routing.ts
        '---module-name.module.ts
```