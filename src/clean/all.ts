import { Rule, chain } from '@angular-devkit/schematics';
import { presenter } from './modules/presenter';
import { domain } from './modules/domain';
import { data } from './modules/data';

export default function (_options: any): Rule {

  return chain([
    presenter(_options),
    domain(_options),
    data(_options)
  ]);
}