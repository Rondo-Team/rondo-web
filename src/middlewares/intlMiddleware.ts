import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { CustomMiddleware } from '@/middlewares/chain'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export default function intlMiddleware(customMiddleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const path = request.nextUrl.pathname

    const middleware = createMiddleware(routing)

    if (path.startsWith('/api/')) {
      return customMiddleware(request, event, response)
    }

    return customMiddleware(request, event, middleware(request))
  }
}
