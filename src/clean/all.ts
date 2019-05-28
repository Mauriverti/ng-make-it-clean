import { Rule, chain, SchematicsException } from '@angular-devkit/schematics';
import { presenter } from './modules/presenter';
import { Helper } from '../helpers/helper';
import { domain } from './modules/domain';
import { module } from './modules/module';
import { Config } from './modules/config';
import { data } from './modules/data';

export default function (_options: Config): Rule {

  if (!_options.name) {
    throw new SchematicsException('Name property is missing');
  }

  const className = Helper.toClassName(_options.name);
  const baseDir = `./src/app/${_options.name}`;

  Object.assign(_options, {className, baseDir});

  return chain([
    presenter(_options),
    domain(_options),
    data(_options),
    module(_options)
  ]);
}