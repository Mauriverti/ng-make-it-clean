import { Rule, Tree, SchematicContext, chain, SchematicsException } from '@angular-devkit/schematics';
import { Helper } from '../../helpers/helper';

export function presenter(_options: any): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const _className = Helper.toClassName(_options.name);

  return chain([
    componentHTML(_options, _className),
    componentTS(_options, _className),
    defaultPresenter(_options, _className),
    presentationRouting(_options, _className),
    presentationModule(_options, _className),
  ]);
}

export function defaultPresenter(_options: any, _className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { Injectable } from '@angular/core';

import { ${_className}Presenter } from '../../domain/boundaries/${_options.name}.presenter';
import { ${_className}Service } from '../../domain/services/${_options.name}.service';

@Injectable()
export class Default${_className}Presenter implements ${_className}Presenter {
  constructor(private service: ${_className}Service) { }
}`;

    tree.create(`presentation/presenter/default-${_options.name}.presenter.ts`, template);
    return tree;
  }
}

export function presentationModule(_options: any, _className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${_className}Routing } from './${_options.name}.routing;
import { ${_className}Component } from './${_options.name}/${_options.name}.component;
import { ${_className}Presenter } from '../domain/boundaries/${_options.name}.presenter';
import { Default${_className}Presenter } from './presenter/default-${_options.name}.presenter';

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

    tree.create(`presentation/${_options.name}.presentation.module.ts`, template);
    return tree;
  }
}

export function presentationRouting(_options: any, _className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${_className}Component } from './${_options.name}/${_options.name}.Component;

const _routes: Routes = [
  { path: '', component: ${_className}Component }
];

@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class ${_className}Routing { }
`;

    tree.create(`presentation/${_options.name}.routing.ts`, template);
    return tree;
  }
}

export function componentTS(_options: any, _className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Component } from '@angular/core';

@Component({
  selector: '${_options.alias ? _options.alias + '-' : '' }${_options.name}',
  templateUrl: './${_options.name}.component.${_options.pug ? 'pug' : 'html'}'
})
export class ${_className}Component { }
`;

    tree.create(`presentation/${_options.name}/${_options.name}.component.ts`, template);
    return tree;
  }
}

export function componentHTML(_options: any, _className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    if (_options.pug) {
      const template = `h1 ${_className} works!`;
      tree.create(`presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    } else {
      const template = `<h1>${_className} works!</h1>`;
      tree.create(`presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    }
    return tree;
  }
}