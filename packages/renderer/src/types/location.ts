export interface LocationProps {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  assign(url: string): void;
  replace(url: string): void;
  reload(): void;
}
