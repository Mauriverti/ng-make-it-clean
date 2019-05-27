import { Rule, chain } from '@angular-devkit/schematics';
import { presenter } from './modules/presenter';
import { domain } from './modules/domain';

export default function (_options: any): Rule {

  return chain([
    presenter(_options),
    domain(_options)
  ]);
}