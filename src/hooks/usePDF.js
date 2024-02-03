import { jsPDF } from "jspdf"

import Raleway from '@/assets/pdf/Raleway-Regular';
import RalewayBold from '@/assets/pdf/Raleway-Bold';
import Meiryo from '@/assets/pdf/Meiryo';
import MeiryoBold from '@/assets/pdf/Meiryo-Bold';

export default function usePDF() {
    
    const makeDeckInfoDocument = (deckName, deckCardsNumber, head, body) => {
        const document = new jsPDF();

        const headerWithPositions = [];
        head.forEach((item, index) => {
            headerWithPositions.push({
                accessor: item.accessor,
                index
            })
        })

        const headForDocument = head.map(item => item.name);
        const bodyForDocument = body.map((item) => {
            let row = new Array(Object.keys(item).length - 1).fill(0);
            for (const [accessor, value] of Object.entries(item)) {
                if (accessor == "id")
                    continue;

                const position = headerWithPositions.find(withPosition => withPosition.accessor == accessor ).index;
                row[position] = value.value;
            }
            return row;
        })

        document.addFileToVFS("Raleway-Bold", RalewayBold);
        document.addFileToVFS("Meiryo", Meiryo);
        document.addFileToVFS("Raleway-Regular", Raleway);
        document.addFileToVFS("Meiryo-Bold", MeiryoBold);

        document.addFont("Raleway-Regular", "Raleway", "normal");
        document.addFont("Raleway-Bold", "Raleway", "bold");
        document.addFont("Meiryo", "Meiryo", "normal");
        document.addFont("Meiryo-Bold", "Meiryo", "bold");
 
        const documentWidth = 210;
        const documentHeight = 297;

        const columnWidths = new Array(headForDocument.length).fill((documentWidth - 20) / headForDocument.length);

        const headerStyle = { fillColor: "#f0f0f0", textColor: "#313131" };
        const rowStyle = { borderColor: "#e4e4e4", fillColor: "#ffffff", textColor: "#313131" };

        const drawHeader = (document, headers, headerStyle, width, height, coords) => {
            document.setFont("Raleway", "bold")

            headers.forEach((header, index) => {
                document.setFillColor(headerStyle.fillColor);
                document.setTextColor(headerStyle.textColor);
                document.setFontSize(10);
                document.rect(coords.x, coords.y, width[index], height, "F");
                document.text(header, coords.x + 2, coords.y + 6);
                coords.x += width[index];
            });
        }    

        const drawRow = (document, row, bodyStyle, width, height, coords) => {
            document.setFont("Meiryo", "normal")
            row.forEach((cell, index) => {
                document.setFillColor(bodyStyle.fillColor);
                document.setDrawColor(bodyStyle.borderColor);
                document.setTextColor(bodyStyle.textColor);
                document.rect(coords.x, coords.y, width[index], height, "FD");
                if (cell.length >= 20) {
                    document.setFontSize("8");
                    document.text(cell, coords.x + 2, coords.y + 6);
                }
                else if (cell.length >= 15 && cell.length < 20) {
                    document.setFontSize("9");
                    document.text(cell, coords.x + 2, coords.y + 6);
                } else {
                    document.setFontSize("11");
                    document.text(cell, coords.x + 2, coords.y + 6);
                }
                
                coords.x += width[index];
            });
        }
        
        const coords = {
            x: 10,
            y: 25,
        }

        document.setFont("Meiryo", "bold")
        document.setFontSize(24);
        document.text("デッキ", documentWidth / 2, 10, "center")
        document.setFont("Meiryo", "normal")
        document.setFontSize(10);
        document.text(`${deckName}, ${deckCardsNumber} карточек`, documentWidth / 2, 20, "center");

        drawHeader(document, headForDocument, headerStyle, columnWidths, 10, coords);

        coords.x = 10;
        coords.y = 35;
      
        bodyForDocument.forEach((row) => {
           
            drawRow(document, row, rowStyle, columnWidths, 10, coords);
            coords.x = 10
            coords.y += 10;

            if (coords.y > documentHeight - 27) {
                coords.y = 10
                document.addPage();
                drawHeader(document, headForDocument, headerStyle, columnWidths, 10, coords);
                coords.x = 10
                coords.y = 20;
            }
        });

        return document;
    }

    const save = (document, name) => {

        document.save(name);
    }

    return {
        makeDeckInfoDocument,
        save,
    }
}