import { Meta, StoryObj } from '@storybook/angular';
import { JuiSearchInputComponent } from '../../app/lib/components/forms/jui-search-input/jui-search-input.component';


const meta: Meta<JuiSearchInputComponent> = {
  title: 'Forms/JuiSearchInput',
  component: JuiSearchInputComponent,
  tags: ['autodocs'],
  decorators: [
    (_, context) => ({
      template: `
        <div class="vn-example">
          <h3 class="first-example-title">Expanded Mode</h3>
          <jui-search-input
            [a11yMessages]="a11yMessages"
            [messages]="messages"
            [collapsible]="false"
            [clearButton]="true"
            (enterEvent)="onSearchEvent($event)"
            (clickSearchEvent)="onSearchEvent($event)"
          />

          <h3>Collapsed Mode</h3>
          <jui-search-input
            [a11yMessages]="a11yMessages"
            [messages]="messages"
            [debounceInterval]="2000"
            [clearValueOnClose]="true"
          />
        </div>
      `,
      props: {
        messages: {
          searchInputPlaceholder: 'Search',
        },
        a11yMessages: {
          searchInputAriaLabel: 'Search',
          expandSearchButtonAriaLabel: 'Click to begin your search',
          searchButtonAriaLabel: 'Click to see search results',
          closeButtonAriaLabel: 'Click to close input field',
          clearButtonAriaLabel: 'Click to clear input field',
        },
        onSearchEvent: (searchText: string) => {
          console.log('Search triggered:', searchText);
        },
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<JuiSearchInputComponent>;

export const Example: Story = {};
