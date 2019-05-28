import { Rule, chain, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Config } from './config';

export function domain(_options: Config): Rule {

  return chain([
    domainModule(_options),
    boundariesPresenter(_options),
    boundariesGateway(_options),
    service(_options),
  ]);
}

function domainModule(_options: Config): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';

/**
 * @ignore
 */
@NgModule({
  providers: [

  ]
})
export class ${_options.className}DomainModule { }`;

    tree.create(`${_options.baseDir}/domain/${_options.name}.domain.module.ts`, template);
    return tree;
  }
}

function boundariesPresenter(_options: Config): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`export abstract class ${_options.className}Presenter {

}`;

    tree.create(`${_options.baseDir}/domain/boundaries/${_options.name}.presenter.ts`, template);
    return tree;
  }
}

function boundariesGateway(_options: Config): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`export abstract class ${_options.className}Gateway {

}`;

    tree.create(`${_options.baseDir}/domain/boundaries/${_options.name}.gateway.ts`, template);
    return tree;
  }
}

function service(_options: Config): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

import { ${_options.className}Gateway } from '../boundaries/${_options.name}.gateway';

@Injectable()
export class ${_options.className}Service {

  /**
   * @ignore
   */
  constructor(private gateway: ${_options.className}Gateway) { }

}`;

    tree.create(`${_options.baseDir}/domain/services/${_options.name}.service.ts`, template);
    return tree;
  }
}