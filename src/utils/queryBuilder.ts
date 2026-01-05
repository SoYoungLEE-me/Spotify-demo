/**
 * 공통 query string builder
 * - undefined / null 값은 자동으로 제외
 * - number → string 자동 변환
 */
export const buildQueryString = (
  params: Record<string, string | number | undefined>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    searchParams.set(key, String(value));
  });

  return searchParams.toString();
};
