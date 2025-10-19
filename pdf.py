from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font("Arial", size=12)

# Parágrafo 1
pdf.multi_cell(0, 8, "Este é o primeiro parágrafo do PDF. Ele é curto e simples.")

# Parágrafo 2
pdf.ln(5)  # adicionar espaço entre parágrafos
pdf.multi_cell(0, 8, "Aqui começa o segundo parágrafo. "
                      "Algumas palavras podem ser divididas, por exemplo: interro-\ngação, para testar o hífen.")

# Parágrafo 3
pdf.ln(5)
pdf.multi_cell(0, 8, "Finalmente, o terceiro parágrafo. Ele serve para verificar "
                      "se o código HTML reconhece corretamente múltiplos parágrafos.")

pdf.output("teste_paragrafos.pdf")
