// This is required for Visual Studio Code to recognize
// imported .vue files
declare module '*.vue' {
    import { defineComponent } from '@vue/composition-api'
    const component: ReturnType<typeof defineComponent> & {unknown: void}
      export default component
}
