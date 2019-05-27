import { Rule, SchematicsException, chain, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Helper } from '../../helpers/helper';

export function domain(_options: any): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const _className = Helper.toClassName(_options.name);

  return chain([
    domainModule(_options, _className),
    boundariesPresenter(_options, _className),
    boundariesGateway(_options, _className),
    service(_options, _className)
  ]);
}

export function domainModule(_options: any, _className: string): Rule {

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
export class ${_className}DomainModule { }`;

    tree.create(`domain/${_options.name}.domain.module.ts`, template);
    return tree;
  }
}

export function boundariesPresenter(_options: any, _className: string): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`export abstract class ${_className}Presenter {

}`;

    tree.create(`domain/boundaries/${_options.name}.presenter.ts`, template);
    return tree;
  }
}

export function boundariesGateway(_options: any, _className: string): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`export abstract class ${_className}Gateway {

}`;

    tree.create(`domain/boundaries/${_options.name}.gateway.ts`, template);
    return tree;
  }
}

export function service(_options: any, _className: string): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { Injectable } from '@angular/core';

import { ${_className}Gateway } from '../boundaries/${_options.name}.gateway';

@Injectable()
export class ${_className}Service {

  /**
   * @ignore
   */
  constructor(private gateway: ${_className}Gateway) { }

}`;

    tree.create(`domain/services/${_options.name}.service.ts`, template);
    return tree;
  }
}