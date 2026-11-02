import type { Nullable } from '@antfu/utils'

export interface ServerResponse<DataT, MetaT extends Record<string, any>> {
  payload: Nullable<DataT>
  meta: Nullable<MetaT>
}

/**
 * Create a standard server response.
 *
 * @param payload Payload response to client
 * @param meta Metadata response to client
 * @returns Standard server response object
 */
export function createResponse<PayloadT, MetaT extends Record<string, any> = Record<string, any>>(
  payload: Nullable<PayloadT> = null,
  meta: Nullable<MetaT> = null,
): ServerResponse<PayloadT, MetaT> {
  return {
    payload,
    meta,
  }
}

/**
 * Create a standard server response for pagination queries, with pre-defined pagination metadata: `total`, `page`, `pageSize`, and `pageCount`.
 *
 * @param payload Array of payload items
 * @param total Total number of items
 * @param page Current page number
 * @param pageSize Number of items per page
 * @returns Standard server response object with pre-defined pagination metadata
 */
export function createQueryResponse<T>(
  payload: T[],
  total: number,
  page: number,
  pageSize: number,
): ServerResponse<T[], { total: number; page: number; pageSize: number; pageCount: number }> {
  return createResponse(payload, {
    total,
    page,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
  })
}
