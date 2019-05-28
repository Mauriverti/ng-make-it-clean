import { Rule, Tree, SchematicContext, chain, SchematicsException } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { Helper } from '../../helpers/helper';

export function presenter(_options: any): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const _className = Helper.toClassName(_options.name);
  const _baseDir = `./src/app/${_options.name}`;

  return chain([
    componentHTML(_options, _className, _baseDir),
    componentTS(_options, _className, _baseDir),
    defaultPresenter(_options, _className, _baseDir),
    presentationRouting(_options, _className, _baseDir),
    presentationModule(_options, _className, _baseDir),
  ]);
}

export function defaultPresenter(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { Injectable } from '@angular/core';

import { ${_className}Presenter } from '../../domain/boundaries/${_options.name}.presenter';
import { ${_className}Service } from '../../domain/services/${_options.name}.service';

@Injectable()
export class Default${_className}Presenter implements ${_className}Presenter {

  /**
   * @ignore
   */
  constructor(private service: ${_className}Service) { }

}`;

    tree.create(normalize(`${_baseDir}/presentation/presenter/default-${_options.name}.presenter.ts`), template);
    return tree;
  }
}

export function presentationModule(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${_className}Routing } from './${_options.name}.routing';
import { ${_className}Component } from './${_options.name}/${_options.name}.component';
import { ${_className}Presenter } from '../domain/boundaries/${_options.name}.presenter';
import { Default${_className}Presenter } from './presenter/default-${_options.name}.presenter';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    ${_className}Routing
  ],
  exports: [
    ${_className}Component
  ],
  declarations: [
    ${_className}Component
  ],
  providers: [
    {
      provide: ${_className}Presenter,
      useClass: Default${_className}Presenter
    }
  ]
})
export class ${_className}ComponentPresentationModule { }`;

    tree.create(`${_baseDir}/presentation/${_options.name}.presentation.module.ts`, template);
    return tree;
  }
}

export function presentationRouting(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${_className}Component } from './${_options.name}/${_options.name}.component';

const _routes: Routes = [
  { path: '', component: ${_className}Component }
];

/**
 * @ignore
 */
@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class ${_className}Routing { }
`;

    tree.create(`${_baseDir}/presentation/${_options.name}.routing.ts`, template);
    return tree;
  }
}

export function componentTS(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Component } from '@angular/core';

import { ${_className}Presenter } from '../../domain/boundaries/${_options.name}.presenter';

@Component({
  selector: '${_options.alias ? _options.alias + '-' : '' }${_options.name}',
  templateUrl: './${_options.name}.component.${_options.pug ? 'pug' : 'html'}'
})
export class ${_className}Component {

  /**
   * @ignore
   */
  constructor(private presenter: ${_className}Presenter) { }
}`;

    tree.create(`${_baseDir}/presentation/${_options.name}/${_options.name}.component.ts`, template);
    return tree;
  }
}

export function componentHTML(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    if (_options.pug) {
      const template = `h1 ${_className} works!`;
      tree.create(`${_baseDir}/presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    } else {
      const template = `<h1>${_className} works!</h1>`;
      tree.create(`${_baseDir}/presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    }
    return tree;
  }
}