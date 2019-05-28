import { Rule, chain, Tree, SchematicContext } from "@angular-devkit/schematics";
import { Config } from "./config";

export function data(_options: Config): Rule {

  return chain([
    defaultGateway(_options),
    repository(_options),
    dataModule(_options),
  ]);
}

function defaultGateway(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

import { ${_options.className}Gateway } from '../domain/boundaries/${_options.name}.gateway';
import { ${_options.className}Repository } from './${_options.name}.repository';

@Injectable()
export class Default${_options.className}Gateway implements ${_options.className}Gateway {

  /**
   * @ignore
   */
  constructor(private repository: ${_options.className}Repository) { }

}`;

    tree.create(`${_options.baseDir}/data/default-${_options.name}.gateway.ts`, template);
    return tree;
  }
}

function repository(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

@Injectable()
export class ${_options.className}Repository {

}`;

    tree.create(`${_options.baseDir}/data/${_options.name}.repository.ts`, template);
    return tree;
  }
}

function dataModule(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';

import { Default${_options.className}Gateway } from './default-${_options.name}.gateway';
import { ${_options.className}Gateway } from '../domain/boundaries/${_options.name}.gateway';
import { ${_options.className}Repository } from './${_options.name}.repository';

/**
 * @ignore
 */
@NgModule({
  providers: [
    ${_options.className}Repository,
    {
      provide: ${_options.className}Gateway,
      useClass: Default${_options.className}Gateway
    }
  ]
})
export class ${_options.className}DataModule { }`;

    tree.create(`${_options.baseDir}/data/${_options.name}.data.module.ts`, template);
    return tree;
  }
}