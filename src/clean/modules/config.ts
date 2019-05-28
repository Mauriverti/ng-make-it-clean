export interface Config {
  name: string;       // name of the module that it will be generated
  alias?: string;     // alias of the project, used in the component's selector
  pug?: boolean;      // if the project uses pug instead of html
  className: string   // name of module parsed to have the initial letters in upper case
  baseDir: string     // directory where the files will be outputed
}