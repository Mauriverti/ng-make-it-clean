import { Rule, SchematicsException, chain, Tree, SchematicContext } from "@angular-devkit/schematics";
import { Helper } from "../../helpers/helper";

export function data(_options: any): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const _className = Helper.toClassName(_options.name);
  const _baseDir = `./src/app/${_options.name}`;

  return chain([
    defaultGateway(_options, _className, _baseDir),
    repository(_options, _className, _baseDir),
    dataModule(_options, _className, _baseDir),
  ]);
}

export function defaultGateway(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

import { ${_className}Gateway } from '../domain/boundaries/${_options.name}.gateway';
import { ${_className}Repository } from './${_options.name}.repository';

@Injectable()
export class Default${_className}Gateway implements ${_className}Gateway {

  /**
   * @ignore
   */
  constructor(private repository: ${_className}Repository) { }

}`;

    tree.create(`${_baseDir}/data/default-${_options.name}.gateway.ts`, template);
    return tree;
  }
}

export function repository(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

@Injectable()
export class ${_className}Repository {

}`;

    tree.create(`${_baseDir}/data/${_options.name}.repository.ts`, template);
    return tree;
  }
}

export function dataModule(_options: any, _className: string, _baseDir: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';

import { Default${_className}Gateway } from './default-${_options.name}.gateway';
import { ${_className}Gateway } from '../domain/boundaries/${_options.name}.gateway';
import { ${_className}Repository } from './${_options.name}.repository';

/**
 * @ignore
 */
@NgModule({
  providers: [
    ${_className}Repository,
    {
      provide: ${_className}Gateway,
      useClass: Default${_className}Gateway
    }
  ]
})
export class ${_className}DataModule { }`;

    tree.create(`${_baseDir}/data/${_options.name}.data.module.ts`, template);
    return tree;
  }
}