import { chain, Tree, SchematicContext, Rule } from "@angular-devkit/schematics";
import { Config } from "./config";

export function module(_options: Config): Rule {

  return chain([
    generalModule(_options)
  ])
}

function generalModule(_options: Config): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const template =
`import { NgModule } from '@angular/core';

import { ${_options.className}DataModule } from './data/${_options.name}.data.module';
import { ${_options.className}DomainModule } from './domain/${_options.name}.domain.module';
import { ${_options.className}PresentationModule } from './presentation/${_options.name}.presentation.module';

/**
 * @ignore
 */
@NgModule({
  imports: [
    ${_options.className}DataModule,
    ${_options.className}DomainModule,
    ${_options.className}PresentationModule
  ]
})
export class ${_options.className}Module { }`
    tree.create(`${_options.baseDir}/${_options.name}.module.ts`, template);
    return tree;
  }
}