export const generateSlug = (
  name: string,
  company: string,
  capsules: number | null,
  category: string,
) => {
  const capsulesPart = capsules !== null ? `-${capsules}-capsules` : '';

  return `${name.toLowerCase()}-${company.toLowerCase()}-${category.toLowerCase()}${capsulesPart}`.replace(
    /\s+/g,
    '-',
  );
};
