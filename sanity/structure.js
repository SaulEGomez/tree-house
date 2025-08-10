import {
  singletonDocumentListItem,
  singletonDocumentListItems,
} from 'sanity-plugin-singleton-tools';
import { PlugIcon, DatabaseIcon, InfoOutlineIcon, PackageIcon, SquareIcon, HighlightIcon } from '@sanity/icons';

export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      singletonDocumentListItem({
        S,
        context,
        type: 'siteSettings',
        title: 'Site Settings',
        id: 'siteSettings',
        icon: InfoOutlineIcon,
      }),
      S.divider(),
      singletonDocumentListItem({
        S,
        context,
        type: 'header',
        title: 'Header',
        id: 'header',
        icon: PlugIcon,
      }),
      singletonDocumentListItem({
        S,
        context,
        type: 'footer',
        title: 'Footer',
        id: 'footer',
        icon: SquareIcon,
      }),
      singletonDocumentListItem({
        S,
        context,
        type: 'kingdomSound',
        title: 'Kingdom Sound Page',
        id: 'kingdomSound',
        icon: PackageIcon,
      }),
      S.divider(),
      S.documentTypeListItem('page').title('Pages').icon(PackageIcon),
      S.divider(),
      S.documentTypeListItem('formSubmissions').title('Form Submissions').icon(DatabaseIcon),
      S.documentTypeListItem('newsletter').title('Newsletter Emails').icon(HighlightIcon),
    ]);