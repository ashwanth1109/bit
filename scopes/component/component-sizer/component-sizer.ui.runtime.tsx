import React from 'react';
import { UIRuntime } from '@teambit/ui';
import type { ComponentDescriptor } from '@teambit/component-descriptor';
import { DocsAspect, DocsUI } from '@teambit/docs';
import { ComponentSize } from '@teambit/component.ui.component-size';
import { ComponentSizerAspect } from './component-sizer.aspect';

/**
 * Component size aspect.
 */
export class SizerUIRuntime {
  static dependencies = [DocsAspect];

  static runtime = UIRuntime;

  static async provider([docs]: [DocsUI]) {
    docs.registerTitleBadge({
      component: function badge({ componentDescriptor }: { componentDescriptor: ComponentDescriptor }) {
        return <ComponentSize componentDescriptor={componentDescriptor} />;
      },
      weight: 30,
    });
  }
}

ComponentSizerAspect.addRuntime(SizerUIRuntime);
