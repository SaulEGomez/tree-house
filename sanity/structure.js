import {
  singletonDocumentListItem,
  singletonDocumentListItems,
} from 'sanity-plugin-singleton-tools';
import {
  PlugIcon,
  DatabaseIcon,
  InfoOutlineIcon,
  PackageIcon,
  SquareIcon,
  HighlightIcon,
} from '@sanity/icons';

export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Singleton Documents
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
      S.divider(),

      // Pages
      S.documentTypeListItem('page').title('Pages').icon(PackageIcon),

      // Contact Page (as its own document)
      S.listItem()
        .title('Contact Page')
        .child(
          S.documentTypeList('page')
            .title('Contact Page')
            .filter('_type == "page" && slug.current == "contact"')
        )
        .icon(PlugIcon),

      S.divider(),

      // Other Documents
      S.documentTypeListItem('formSubmissions').title('Form Submissions').icon(DatabaseIcon),
      S.documentTypeListItem('newsletter').title('Newsletter Emails').icon(HighlightIcon),
    ]);
