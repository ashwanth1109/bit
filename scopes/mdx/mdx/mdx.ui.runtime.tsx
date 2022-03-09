import React from 'react';
import { CompositionsAspect, CompositionsUI } from '@teambit/compositions';
import { UIRuntime } from '@teambit/ui';
import { TesterAspect, TesterUI } from '@teambit/tester';
import { EmptyBox } from '@teambit/design.ui.empty-box';
import { BASE_DOCS_DOMAIN } from '@teambit/legacy/dist/constants';
import { MDXAspect } from './mdx.aspect';

export class MDXEnvUI {
  static runtime = UIRuntime;
  static slots = [];
  static dependencies = [CompositionsAspect, TesterAspect];

  static async provider([compositionsUI, testerUi]: [CompositionsUI, TesterUI]) {
    const mdxEnvUI = new MDXEnvUI();

    testerUi.registerEmptyState(() => {
      return (
        <EmptyBox
          title="This component doesn’t have any tests."
          linkText="Learn how to add tests to your MDX components"
          link={`https://${BASE_DOCS_DOMAIN}/dev-services-overview/tester/tester-overview`}
        />
      );
    });

    compositionsUI.registerEmptyState(() => {
      return (
        <EmptyBox
          title="This component doesn’t have any compositions."
          linkText="Learn how to add compositions to your MDX components"
          link={`https://${BASE_DOCS_DOMAIN}/dev-services-overview/compositions/compositions-overview`}
        />
      );
    });

    return mdxEnvUI;
  }
}

MDXAspect.addRuntime(MDXEnvUI);

export default MDXEnvUI;
