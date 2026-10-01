import ipaddress

from fastapi import Request


def _is_internal(ip: str) -> bool:
    try:
        addr = ipaddress.ip_address(ip)
    except ValueError:
        return False
    return addr.is_private or addr.is_loopback


def get_client_ip(request: Request) -> str:
    """Return the real client IP behind the hosting proxy.

    On Hugging Face Spaces every connection arrives from an internal proxy
    (10.x), so request.client.host is shared by many visitors. When the
    connection comes from an internal address, read X-Forwarded-For from the
    right: each proxy appends the address it saw, so the first public IP from
    the right is the one added by the edge proxy. Entries further left are
    client-supplied and can be spoofed, so they are never trusted.
    """
    peer = request.client.host if request.client else "unknown"
    if not _is_internal(peer):
        return peer

    forwarded = request.headers.get("X-Forwarded-For", "")
    hops = [h.strip() for h in forwarded.split(",") if h.strip()]
    for hop in reversed(hops):
        if not _is_internal(hop):
            try:
                ipaddress.ip_address(hop)
            except ValueError:
                break
            return hop
    return peer
