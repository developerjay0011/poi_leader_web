export const insertVariables = (template: string, variables: Record<string, any>): string => {
  const regex = /{{\s*([^{}\s]*)\s*}}/g
  // Iterate over the keys in the variables object
  for (const key in variables) {
    if (variables.hasOwnProperty(key)) {
      // Replace occurrences of "${key}" with the corresponding value from the variables object
      template = template.replace(regex, variables[key]);
    }
  }
  return template;
}
