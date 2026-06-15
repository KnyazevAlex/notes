const validateOrThrow = (val: string | FormDataEntryValue, regex: RegExp, fieldName : string) => {
    if (!regex.test(val.toString())) {
    return (`Invalid ${fieldName}: Must be 3-50 chars long, spaces don't count!`);
  }
  return null;
};
export default validateOrThrow