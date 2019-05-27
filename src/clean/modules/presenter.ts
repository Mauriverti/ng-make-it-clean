import { Rule, Tree, SchematicContext, chain, SchematicsException } from '@angular-devkit/schematics';
import { Helper } from '../../helpers/helper';

export function presenter(_options: any): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const className = Helper.toClassName(_options.name);

  return chain([
    componentHTML(_options, className),
    componentTS(_options, className),
    defaultPresenter(_options, className),
    presentationRouting(_options, className),
    presentationModule(_options, className),
  ]);
}

export function defaultPresenter(_options: any, className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { Injectable } from '@angular/core';

@Injectable()
export class Default${className}Presenter implements ${className}Presenter {
  constructor(private interactor: ${className}Interactor) { }
}`;

    tree.create(`presentation/presenter/default-${_options.name}.presenter.ts`, template);
    return tree;
  }
}

export function presentationModule(_options: any, className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${className}Routing } from './${_options.name}.routing;
import { ${className}Component } from './${_options.name}/${_options.name}.component;
import { ${className}Presenter } from '../domain/boundaries/${_options.name}.presenter';
import { Default${className}Presenter } from './presenter/default-${_options.name}.presenter';

@NgModule({
  imports: [
    CommonModule,
    ${className}Routing
  ],
  exports: [
    ${className}Component
  ],
  declarations: [
    ${className}Component
  ],
  providers: [
    {
      provide: ${className}Presenter,
      useClass: Default${className}Presenter
    }
  ]
})
export class ${className}ComponentPresentationModule { }`;

    tree.create(`presentation/${_options.name}-presentation.module.ts`, template);
    return tree;
  }
}

export function presentationRouting(_options: any, className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${className}Component } from './${_options.name}/${_options.name}.Component;

const _routes: Routes = [
  { path: '', component: ${className}Component }
];

@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class ${className}Routing { }
`;

    tree.create(`presentation/${_options.name}.routing.ts`, template);
    return tree;
  }
}

export function componentTS(_options: any, className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Component } from '@angular/core';

@Component({
  selector: '${_options.alias ? _options.alias + '-' : '' }${_options.name}',
  templateUrl: './${_options.name}.component.${_options.pug ? 'pug' : 'html'}'
})
export class ${className}Component { }
`;

    tree.create(`presentation/${_options.name}/${_options.name}.component.ts`, template);
    return tree;
  }
}

export function componentHTML(_options: any, className: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    if (_options.pug) {
      const template = `h1 ${className} works!`;
      tree.create(`presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    } else {
      const template = `<h1>${className} works!</h1>`;
      tree.create(`presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    }
    return tree;
  }
}