from starlette.requests import Request

from services.client_ip import get_client_ip


def make_request(peer: str, forwarded: str | None = None) -> Request:
    headers = []
    if forwarded is not None:
        headers.append((b"x-forwarded-for", forwarded.encode()))
    return Request({"type": "http", "client": (peer, 1234), "headers": headers})


def test_direct_public_peer_is_used_and_header_ignored():
    assert get_client_ip(make_request("198.51.100.4", "203.0.113.7")) == "198.51.100.4"


def test_internal_proxy_uses_forwarded_client():
    assert get_client_ip(make_request("10.16.3.208", "138.117.14.190")) == "138.117.14.190"


def test_spoofed_left_entries_are_ignored():
    request = make_request("10.16.3.208", "203.0.113.7, 138.117.14.190")
    assert get_client_ip(request) == "138.117.14.190"


def test_internal_hops_on_the_right_are_skipped():
    request = make_request("10.16.3.208", "138.117.14.190, 10.16.2.178, 172.22.0.1")
    assert get_client_ip(request) == "138.117.14.190"


def test_internal_proxy_without_header_falls_back_to_peer():
    assert get_client_ip(make_request("10.16.3.208")) == "10.16.3.208"


def test_garbage_header_falls_back_to_peer():
    assert get_client_ip(make_request("10.16.3.208", "not-an-ip")) == "10.16.3.208"
