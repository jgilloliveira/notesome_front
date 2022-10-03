export function formatErrorResponse(error: any) {

  // Formateo del error que devuelve django.
  for (const attr in error.response.data) {
    const value = error.response.data[attr];
    if(Array.isArray(value))
      error.response.data[attr] = value[0]
  }
  
  return { error: error.response.data }
}