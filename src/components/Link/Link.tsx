import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import s from './Link.module.scss';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

export interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
  Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  (props, ref) => {
    const {
      to, linkAs, replace, scroll, shallow, prefetch, locale, ...other
    } = props;

    return (
      <NextLink
        passHref
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  },
);

export type LinkProps = {
  display?: 'block' | 'inline-block' | 'inline',
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
  cover?: boolean,
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    display = 'inline',
    cover,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
    [s.inlineBlock]: display === 'inline-block',
    [s.block]: display === 'block',
    [s.cover]: cover,
  });

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor
          ref={ref}
          className={className}
              // @ts-ignore
          href={href}
          {...other}
        />
      );
    }

    return (
      <MuiLink
        ref={ref}
        className={className}
            // @ts-ignore
        href={href}
        {...other}
      />
    );
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href, linkAs, replace, scroll, shallow, prefetch, locale,
  };

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        ref={ref}
        className={className}
        {...nextjsProps}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      ref={ref}
      component={NextLinkComposed}
      className={className}
      {...nextjsProps}
      {...other}
    />
  );
});

export default Link;
