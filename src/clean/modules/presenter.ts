import { Rule, Tree, SchematicContext, chain, SchematicsException } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';

import { Helper } from '../../helpers/helper';
import { Config } from './config';

export function presenter(_options: Config): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const className = Helper.toClassName(_options.name);
  const baseDir = `./src/app/${_options.name}`;

  Object.assign(_options, {className, baseDir});

  return chain([
    componentHTML(_options),
    componentTS(_options),
    defaultPresenter(_options),
    presentationRouting(_options),
    presentationModule(_options),
  ]);
}

function defaultPresenter(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { Injectable } from '@angular/core';

import { ${_options.className}Presenter } from '../../domain/boundaries/${_options.name}.presenter';
import { ${_options.className}Service } from '../../domain/services/${_options.name}.service';

@Injectable()
export class Default${_options.className}Presenter implements ${_options.className}Presenter {

  /**
   * @ignore
   */
  constructor(private service: ${_options.className}Service) { }

}`;

    tree.create(normalize(`${_options.baseDir}/presentation/presenter/default-${_options.name}.presenter.ts`), template);
    return tree;
  }
}

function presentationModule(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const template =
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${_options.className}Routing } from './${_options.name}.routing';
import { ${_options.className}Component } from './${_options.name}/${_options.name}.component';
import { ${_options.className}Presenter } from '../domain/boundaries/${_options.name}.presenter';
import { Default${_options.className}Presenter } from './presenter/default-${_options.name}.presenter';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    ${_options.className}Routing
  ],
  exports: [
    ${_options.className}Component
  ],
  declarations: [
    ${_options.className}Component
  ],
  providers: [
    {
      provide: ${_options.className}Presenter,
      useClass: Default${_options.className}Presenter
    }
  ]
})
export class ${_options.className}PresentationModule { }`;

    tree.create(`${_options.baseDir}/presentation/${_options.name}.presentation.module.ts`, template);
    return tree;
  }
}

function presentationRouting(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${_options.className}Component } from './${_options.name}/${_options.name}.component';

const _routes: Routes = [
  { path: '', component: ${_options.className}Component }
];

/**
 * @ignore
 */
@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class ${_options.className}Routing { }
`;

    tree.create(`${_options.baseDir}/presentation/${_options.name}.routing.ts`, template);
    return tree;
  }
}

function componentTS(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Component } from '@angular/core';

import { ${_options.className}Presenter } from '../../domain/boundaries/${_options.name}.presenter';

@Component({
  selector: '${_options.alias ? _options.alias + '-' : ''}${_options.name}',
  templateUrl: './${_options.name}.component.${_options.pug ? 'pug' : 'html'}'
})
export class ${_options.className}Component {

  /**
   * @ignore
   */
  constructor(private presenter: ${_options.className}Presenter) { }
}`;

    tree.create(`${_options.baseDir}/presentation/${_options.name}/${_options.name}.component.ts`, template);
    return tree;
  }
}

function componentHTML(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    if (_options.pug) {
      const template = `h1 ${_options.className} works!`;
      tree.create(`${_options.baseDir}/presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    } else {
      const template = `<h1>${_options.className} works!</h1>`;
      tree.create(`${_options.baseDir}/presentation/${_options.name}/${_options.name}.component.${_options.pug ? 'pug' : 'html'}`, template);
    }
    return tree;
  }
}