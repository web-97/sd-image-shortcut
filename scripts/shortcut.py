import modules.scripts as scripts
import gradio as gr
import os

from modules import images, script_callbacks
from modules.processing import process_images, Processed
from modules.processing import Processed
from modules.shared import opts, cmd_opts, state


class ExtensionTemplateScript(scripts.Script):
    def title(self):
        return "Shortcut"

    def show(self, is_img2img):
        return scripts.AlwaysVisible

    def ui(self, is_img2img):
        with gr.Accordion('Shortcut', open=True,elem_classes='shortcut-active'):
            with gr.Blocks():
                with gr.Row(elem_classes='shortcut-buts'):
                    gr.Button(value="Auto",visible=is_img2img, variant='secondary', elem_classes="shortcut-auto").style(size="sm").click(None,_js="autoReadImageSize")
        return []

    def run(self, p, button):
        return p
    