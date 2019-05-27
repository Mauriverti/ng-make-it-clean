export class Helper {

  static firstLetters = /^\w|[A-Z]|\b\w/g;

  static toCamelCaseName(str: string) {
    return str.replace(this.firstLetters, (word, index) => !!index ? word.toUpperCase() : word.toLowerCase()).replace(/(-)/g, '');
  }

  static toClassName(str: string) {
    return str.replace(this.firstLetters, (word) => word.toUpperCase()).replace(/(-)/g, '');
  }
}